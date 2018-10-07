/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { KeywordsComponentsPage, KeywordsDeleteDialog, KeywordsUpdatePage } from './keywords.page-object';

const expect = chai.expect;

describe('Keywords e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let keywordsUpdatePage: KeywordsUpdatePage;
    let keywordsComponentsPage: KeywordsComponentsPage;
    let keywordsDeleteDialog: KeywordsDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Keywords', async () => {
        await navBarPage.goToEntity('keywords');
        keywordsComponentsPage = new KeywordsComponentsPage();
        expect(await keywordsComponentsPage.getTitle()).to.eq('dataCenterApp.keywords.home.title');
    });

    it('should load create Keywords page', async () => {
        await keywordsComponentsPage.clickOnCreateButton();
        keywordsUpdatePage = new KeywordsUpdatePage();
        expect(await keywordsUpdatePage.getPageTitle()).to.eq('dataCenterApp.keywords.home.createOrEditLabel');
        await keywordsUpdatePage.cancel();
    });

    it('should create and save Keywords', async () => {
        const nbButtonsBeforeCreate = await keywordsComponentsPage.countDeleteButtons();

        await keywordsComponentsPage.clickOnCreateButton();
        await keywordsUpdatePage.setKeywordInput('keyword');
        expect(await keywordsUpdatePage.getKeywordInput()).to.eq('keyword');
        await keywordsUpdatePage.setEmergencyKeywordInput('emergencyKeyword');
        expect(await keywordsUpdatePage.getEmergencyKeywordInput()).to.eq('emergencyKeyword');
        await keywordsUpdatePage.setBInput('b');
        expect(await keywordsUpdatePage.getBInput()).to.eq('b');
        await keywordsUpdatePage.setRInput('r');
        expect(await keywordsUpdatePage.getRInput()).to.eq('r');
        await keywordsUpdatePage.setSInput('s');
        expect(await keywordsUpdatePage.getSInput()).to.eq('s');
        await keywordsUpdatePage.setTInput('t');
        expect(await keywordsUpdatePage.getTInput()).to.eq('t');
        await keywordsUpdatePage.save();
        expect(await keywordsUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await keywordsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Keywords', async () => {
        const nbButtonsBeforeDelete = await keywordsComponentsPage.countDeleteButtons();
        await keywordsComponentsPage.clickOnLastDeleteButton();

        keywordsDeleteDialog = new KeywordsDeleteDialog();
        expect(await keywordsDeleteDialog.getDialogTitle()).to.eq('dataCenterApp.keywords.delete.question');
        await keywordsDeleteDialog.clickOnConfirmButton();

        expect(await keywordsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
