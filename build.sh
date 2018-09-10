#!/bin/bash
#
# Run this to build, tag and create fat-manifest for your images


set -e

if [[ -f build.config ]]; then
  source ./build.config
else
  echo ERROR: ./build.config not found.
  exit 1
fi

# Fail on empty params
if [[ -z ${REPO} || -z ${IMAGE_NAME} || -z ${TARGET_ARCHES} ]]; then
  echo ERROR: Please set build parameters.
  exit 1
fi

# Determine OS and Arch.
build_os=$(uname -s | tr '[:upper:]' '[:lower:]' )
build_uname_arch=$(uname -m | tr '[:upper:]' '[:lower:]' )

case ${build_uname_arch} in
  x86_64  ) build_arch=amd64 ;;
  aarch64 ) build_arch=arm ;;
  arm*    ) build_arch=arm ;;
  *)
    echo ERROR: Sorry, unsuppoted architecture ${native_arch};
    exit 1
    ;;
esac

docker_bin_path=$(realpath $( type -P docker-${build_os}-${build_arch} || type -P ${DOCKER_CLI_PATH%/}/docker-${build_os}-${build_arch} || echo docker-not-found ))
echo docker_bin_path: ${docker_bin_path}

if [[ ! -x ${docker_bin_path} ]]; then
  echo ERROR: Missing Docker CLI with manifest command \(docker_bin_path: ${docker_bin_path}\)
  exit 1
fi

if [[ -z ${IMAGE_VERSION} ]]; then
  IMAGE_VERSION="latest"
fi

# Build source
yarn
yarn build
./mvnw package -Pprod -Ddockerfile.skip

# Build docker images
base_dir=$(dirname "$(realpath "$0")" )
target_dir=${base_dir}/target
dockerfile_dir=${base_dir}/src/main/docker

for docker_arch in ${TARGET_ARCHES}; do
  echo ========  build: ${docker_arch}  ========

  case ${docker_arch} in
    amd64       ) qemu_arch="x86_64"
                  image_openjdk_tag="8-jre-alpine" ;;
    arm32v[5-7] ) qemu_arch="arm"
                  image_openjdk_tag="11-jre-slim" ;;
    arm64v8     ) qemu_arch="aarch64"
                  image_openjdk_tag="8-jre-slim" ;;
    *)
      echo ERROR: Unknown target arch.
      exit 1
  esac
  cp ${dockerfile_dir}/Dockerfile.cross ${target_dir}/Dockerfile.${docker_arch}
  sed -i "s|__BASEIMAGE_ARCH__|${docker_arch}|g" ${target_dir}/Dockerfile.${docker_arch}
  sed -i "s|__OPENJDK_TAG__|${image_openjdk_tag}|g" ${target_dir}/Dockerfile.${docker_arch}
  sed -i "s|__QEMU_ARCH__|${qemu_arch}|g" ${target_dir}/Dockerfile.${docker_arch}
  if [[ ${docker_arch} == "amd64" || ${build_os} == "darwin" ]]; then
    sed -i "/__CROSS_/d" ${target_dir}/Dockerfile.${docker_arch}
  else
    sed -i "s/__CROSS_//g" ${target_dir}/Dockerfile.${docker_arch}
  fi

  # copy qemu to target
  mkdir -p ${target_dir}/qemu
  [ -e ${base_dir}/qemu/qemu-${qemu_arch}-static ] && cp ${base_dir}/qemu/qemu-${qemu_arch}-static ${target_dir}/qemu/qemu-${qemu_arch}-static

  pushd ${target_dir}

  docker build -f Dockerfile.${docker_arch} -t ${REPO}/${IMAGE_NAME}:${docker_arch}-${IMAGE_VERSION} .
  docker push ${REPO}/${IMAGE_NAME}:${docker_arch}-${IMAGE_VERSION}
  arch_images="${arch_images} ${REPO}/${IMAGE_NAME}:${docker_arch}-${IMAGE_VERSION}"

  # delete obsolete files
  [ -e Dockerfile.${docker_arch} ] && rm Dockerfile.${docker_arch}
  [ -e qemu/qemu-${qemu_arch}-static ] && rm qemu/qemu-${qemu_arch}-static

  popd
done

echo INFO: Creating fat manifest for ${REPO}/${IMAGE_NAME}:${IMAGE_VERSION}
echo INFO: with subimages: ${arch_images}
if [ -d ${HOME}/.docker/manifests/docker.io_${REPO}_${IMAGE_NAME}-${IMAGE_VERSION} ]; then
  rm -rf ${HOME}/.docker/manifests/docker.io_${REPO}_${IMAGE_NAME}-${IMAGE_VERSION}
fi
${docker_bin_path} manifest create --amend ${REPO}/${IMAGE_NAME}:${IMAGE_VERSION} ${arch_images}
for docker_arch in ${TARGET_ARCHES}; do
  case ${docker_arch} in
    amd64       ) annotate_flags="" ;;
    arm32v[5-7] ) annotate_flags="--os linux --arch arm" ;;
    arm64v8     ) annotate_flags="--os linux --arch arm64 --variant armv8" ;;
  esac
  echo INFO: Annotating arch: ${docker_arch} with \"${annotate_flags}\"
  ${docker_bin_path} manifest annotate ${REPO}/${IMAGE_NAME}:${IMAGE_VERSION} ${REPO}/${IMAGE_NAME}:${docker_arch}-${IMAGE_VERSION} ${annotate_flags}
done
echo INFO: Pushing ${REPO}/${IMAGE_NAME}:${IMAGE_VERSION}
${docker_bin_path} manifest push ${REPO}/${IMAGE_NAME}:${IMAGE_VERSION}
