/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ResourceComponentsPage, ResourceDeleteDialog, ResourceUpdatePage } from './resource.page-object';

const expect = chai.expect;

describe('Resource e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let resourceUpdatePage: ResourceUpdatePage;
    let resourceComponentsPage: ResourceComponentsPage;
    let resourceDeleteDialog: ResourceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Resources', async () => {
        await navBarPage.goToEntity('resource');
        resourceComponentsPage = new ResourceComponentsPage();
        expect(await resourceComponentsPage.getTitle()).to.eq('dataCenterApp.resource.home.title');
    });

    it('should load create Resource page', async () => {
        await resourceComponentsPage.clickOnCreateButton();
        resourceUpdatePage = new ResourceUpdatePage();
        expect(await resourceUpdatePage.getPageTitle()).to.eq('dataCenterApp.resource.home.createOrEditLabel');
        await resourceUpdatePage.cancel();
    });

    it('should create and save Resources', async () => {
        const nbButtonsBeforeCreate = await resourceComponentsPage.countDeleteButtons();

        await resourceComponentsPage.clickOnCreateButton();
        await resourceUpdatePage.setNameInput('name');
        expect(await resourceUpdatePage.getNameInput()).to.eq('name');
        await resourceUpdatePage.alarmInfoSelectLastOption();
        await resourceUpdatePage.save();
        expect(await resourceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await resourceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Resource', async () => {
        const nbButtonsBeforeDelete = await resourceComponentsPage.countDeleteButtons();
        await resourceComponentsPage.clickOnLastDeleteButton();

        resourceDeleteDialog = new ResourceDeleteDialog();
        expect(await resourceDeleteDialog.getDialogTitle()).to.eq('dataCenterApp.resource.delete.question');
        await resourceDeleteDialog.clickOnConfirmButton();

        expect(await resourceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
