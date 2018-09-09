
SHELL:=/bin/bash

# PROFILE: [dev|prod]
PROFILE?=prod

ifeq ($(MAKECMDGOALS),amd64)
	ARCH = amd64
else
	ifeq ($(MAKECMDGOALS),arm64v8)
		ARCH = arm64v8
	else
		ifeq ($(MAKECMDGOALS),arm32v7)
			ARCH = arm32v7
		endif
	endif
endif

$(info current architecture: $(ARCH))

amd64: create_dockerfile_amd64 build_source docker_build docker_push cleanup

arm64v8: create_dockerfile_arm64v8 build_source download_qemu_arm64v8 docker_build docker_push cleanup

arm32v7: create_dockerfile_arm32v7 build_source download_qemu_arm32v7 docker_build docker_push cleanup

create_dockerfile_amd64:
	$(info ************  Create docker file for amd64  ************)

	cp ./src/main/docker/Dockerfile.cross ./src/main/docker/Dockerfile.amd64
	sed -i "s|__BASEIMAGE_ARCH__|amd64|g" ./src/main/docker/Dockerfile.amd64
	sed -i "s|__QEMU_ARCH__|x86_64|g" ./src/main/docker/Dockerfile.amd64
	sed -i "/__CROSS_/d" ./src/main/docker/Dockerfile.amd64

create_dockerfile_arm64v8:
	$(info ************  Create docker file for arm64v8  ************)

	cp ./src/main/docker/Dockerfile.cross ./src/main/docker/Dockerfile.arm64v8
	sed -i "s|__BASEIMAGE_ARCH__|arm64v8|g" ./src/main/docker/Dockerfile.arm64v8
	sed -i "s|__QEMU_ARCH__|aarch64|g" ./src/main/docker/Dockerfile.arm64v8
	sed -i  "s/__CROSS_//g" ./src/main/docker/Dockerfile.arm64v8

create_dockerfile_arm32v7:
	$(info ************  Create docker file for arm32v7  ************)

	cp ./src/main/docker/Dockerfile.cross ./src/main/docker/Dockerfile.arm32v7
	sed -i "s|__BASEIMAGE_ARCH__|arm32v7|g" ./src/main/docker/Dockerfile.arm32v7
	sed -i "s|__QEMU_ARCH__|arm|g" ./src/main/docker/Dockerfile.arm32v7
	sed -i  "s/__CROSS_//g" ./src/main/docker/Dockerfile.arm32v7

download_qemu_arm64v8:
	$(info ************  Download QEmu  ************)

	if [ ! -f qemu-aarch64-static ]; then \
		wget https://github.com/multiarch/qemu-user-static/releases/download/v2.12.0/qemu-aarch64-static ; \
		chmod 755 qemu-aarch64-static ; \
	fi

download_qemu_arm32v7:
	$(info ************  Download QEmu  ************)

	if [ ! -f qemu-arm-static ]; then \
		wget https://github.com/multiarch/qemu-user-static/releases/download/v2.12.0/qemu-arm-static ; \
		chmod 755 qemu-arm-static ; \
	fi

build_source:
	$(info ************  Build source  ************)
	yarn build
	./mvnw package -P$(PROFILE) -Ddockerfile.skip

docker_build:
	$(info ************  Build docker image  ************)
	docker build -f ./src/main/docker/Dockerfile.$(ARCH) -t $(REPO)/$(IMAGE_NAME):$(ARCH) .

docker_push:
	$(info ************  Push docker image  ************)
	docker push $(REPO)/$(IMAGE_NAME):$(ARCH)

cleanup:
	$(info ************  Cleanup  ************)
	rm ./src/main/docker/Dockerfile.$(ARCH)
