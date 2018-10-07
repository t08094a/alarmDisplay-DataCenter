/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EquipmentComponentsPage, EquipmentDeleteDialog, EquipmentUpdatePage } from './equipment.page-object';

const expect = chai.expect;

describe('Equipment e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let equipmentUpdatePage: EquipmentUpdatePage;
    let equipmentComponentsPage: EquipmentComponentsPage;
    let equipmentDeleteDialog: EquipmentDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Equipment', async () => {
        await navBarPage.goToEntity('equipment');
        equipmentComponentsPage = new EquipmentComponentsPage();
        expect(await equipmentComponentsPage.getTitle()).to.eq('dataCenterApp.equipment.home.title');
    });

    it('should load create Equipment page', async () => {
        await equipmentComponentsPage.clickOnCreateButton();
        equipmentUpdatePage = new EquipmentUpdatePage();
        expect(await equipmentUpdatePage.getPageTitle()).to.eq('dataCenterApp.equipment.home.createOrEditLabel');
        await equipmentUpdatePage.cancel();
    });

    it('should create and save Equipment', async () => {
        const nbButtonsBeforeCreate = await equipmentComponentsPage.countDeleteButtons();

        await equipmentComponentsPage.clickOnCreateButton();
        await equipmentUpdatePage.setNameInput('name');
        expect(await equipmentUpdatePage.getNameInput()).to.eq('name');
        await equipmentUpdatePage.resourceSelectLastOption();
        await equipmentUpdatePage.save();
        expect(await equipmentUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await equipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Equipment', async () => {
        const nbButtonsBeforeDelete = await equipmentComponentsPage.countDeleteButtons();
        await equipmentComponentsPage.clickOnLastDeleteButton();

        equipmentDeleteDialog = new EquipmentDeleteDialog();
        expect(await equipmentDeleteDialog.getDialogTitle()).to.eq('dataCenterApp.equipment.delete.question');
        await equipmentDeleteDialog.clickOnConfirmButton();

        expect(await equipmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
