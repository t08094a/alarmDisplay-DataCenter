/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AlarmInfoComponentsPage, AlarmInfoDeleteDialog, AlarmInfoUpdatePage } from './alarm-info.page-object';

const expect = chai.expect;

describe('AlarmInfo e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let alarmInfoUpdatePage: AlarmInfoUpdatePage;
    let alarmInfoComponentsPage: AlarmInfoComponentsPage;
    let alarmInfoDeleteDialog: AlarmInfoDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load AlarmInfos', async () => {
        await navBarPage.goToEntity('alarm-info');
        alarmInfoComponentsPage = new AlarmInfoComponentsPage();
        expect(await alarmInfoComponentsPage.getTitle()).to.eq('dataCenterApp.alarmInfo.home.title');
    });

    it('should load create AlarmInfo page', async () => {
        await alarmInfoComponentsPage.clickOnCreateButton();
        alarmInfoUpdatePage = new AlarmInfoUpdatePage();
        expect(await alarmInfoUpdatePage.getPageTitle()).to.eq('dataCenterApp.alarmInfo.home.createOrEditLabel');
        await alarmInfoUpdatePage.cancel();
    });

    it('should create and save AlarmInfos', async () => {
        const nbButtonsBeforeCreate = await alarmInfoComponentsPage.countDeleteButtons();

        await alarmInfoComponentsPage.clickOnCreateButton();
        await alarmInfoUpdatePage.setTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await alarmInfoUpdatePage.getTimeInput()).to.contain('2001-01-01T02:30');
        await alarmInfoUpdatePage.setPriorityInput('5');
        expect(await alarmInfoUpdatePage.getPriorityInput()).to.eq('5');
        await alarmInfoUpdatePage.setCommentInput('comment');
        expect(await alarmInfoUpdatePage.getCommentInput()).to.eq('comment');
        await alarmInfoUpdatePage.placeOfActionSelectLastOption();
        await alarmInfoUpdatePage.keywordsSelectLastOption();
        await alarmInfoUpdatePage.save();
        expect(await alarmInfoUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await alarmInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last AlarmInfo', async () => {
        const nbButtonsBeforeDelete = await alarmInfoComponentsPage.countDeleteButtons();
        await alarmInfoComponentsPage.clickOnLastDeleteButton();

        alarmInfoDeleteDialog = new AlarmInfoDeleteDialog();
        expect(await alarmInfoDeleteDialog.getDialogTitle()).to.eq('dataCenterApp.alarmInfo.delete.question');
        await alarmInfoDeleteDialog.clickOnConfirmButton();

        expect(await alarmInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
