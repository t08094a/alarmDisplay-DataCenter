/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CommonInfoComponentsPage, CommonInfoDeleteDialog, CommonInfoUpdatePage } from './common-info.page-object';

const expect = chai.expect;

describe('CommonInfo e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let commonInfoUpdatePage: CommonInfoUpdatePage;
    let commonInfoComponentsPage: CommonInfoComponentsPage;
    let commonInfoDeleteDialog: CommonInfoDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CommonInfos', async () => {
        await navBarPage.goToEntity('common-info');
        commonInfoComponentsPage = new CommonInfoComponentsPage();
        expect(await commonInfoComponentsPage.getTitle()).to.eq('dataCenterApp.commonInfo.home.title');
    });

    it('should load create CommonInfo page', async () => {
        await commonInfoComponentsPage.clickOnCreateButton();
        commonInfoUpdatePage = new CommonInfoUpdatePage();
        expect(await commonInfoUpdatePage.getPageTitle()).to.eq('dataCenterApp.commonInfo.home.createOrEditLabel');
        await commonInfoUpdatePage.cancel();
    });

    it('should create and save CommonInfos', async () => {
        const nbButtonsBeforeCreate = await commonInfoComponentsPage.countDeleteButtons();

        await commonInfoComponentsPage.clickOnCreateButton();
        await commonInfoUpdatePage.setTitleInput('title');
        expect(await commonInfoUpdatePage.getTitleInput()).to.eq('title');
        await commonInfoUpdatePage.setDescriptionInput('description');
        expect(await commonInfoUpdatePage.getDescriptionInput()).to.eq('description');
        await commonInfoUpdatePage.setShowStartDateInput('2000-12-31');
        expect(await commonInfoUpdatePage.getShowStartDateInput()).to.eq('2000-12-31');
        await commonInfoUpdatePage.setShowEndDateInput('2000-12-31');
        expect(await commonInfoUpdatePage.getShowEndDateInput()).to.eq('2000-12-31');
        const selectedAlarmRelevant = commonInfoUpdatePage.getAlarmRelevantInput();
        if (await selectedAlarmRelevant.isSelected()) {
            await commonInfoUpdatePage.getAlarmRelevantInput().click();
            expect(await commonInfoUpdatePage.getAlarmRelevantInput().isSelected()).to.be.false;
        } else {
            await commonInfoUpdatePage.getAlarmRelevantInput().click();
            expect(await commonInfoUpdatePage.getAlarmRelevantInput().isSelected()).to.be.true;
        }
        await commonInfoUpdatePage.setAlarmRelevantStartDateInput('2000-12-31');
        expect(await commonInfoUpdatePage.getAlarmRelevantStartDateInput()).to.eq('2000-12-31');
        await commonInfoUpdatePage.setAlarmRelevantEndDateInput('2000-12-31');
        expect(await commonInfoUpdatePage.getAlarmRelevantEndDateInput()).to.eq('2000-12-31');
        await commonInfoUpdatePage.save();
        expect(await commonInfoUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await commonInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CommonInfo', async () => {
        const nbButtonsBeforeDelete = await commonInfoComponentsPage.countDeleteButtons();
        await commonInfoComponentsPage.clickOnLastDeleteButton();

        commonInfoDeleteDialog = new CommonInfoDeleteDialog();
        expect(await commonInfoDeleteDialog.getDialogTitle()).to.eq('dataCenterApp.commonInfo.delete.question');
        await commonInfoDeleteDialog.clickOnConfirmButton();

        expect(await commonInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
