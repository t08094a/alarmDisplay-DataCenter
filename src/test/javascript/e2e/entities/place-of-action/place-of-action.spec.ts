/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlaceOfActionComponentsPage, PlaceOfActionDeleteDialog, PlaceOfActionUpdatePage } from './place-of-action.page-object';

const expect = chai.expect;

describe('PlaceOfAction e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let placeOfActionUpdatePage: PlaceOfActionUpdatePage;
    let placeOfActionComponentsPage: PlaceOfActionComponentsPage;
    let placeOfActionDeleteDialog: PlaceOfActionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load PlaceOfActions', async () => {
        await navBarPage.goToEntity('place-of-action');
        placeOfActionComponentsPage = new PlaceOfActionComponentsPage();
        expect(await placeOfActionComponentsPage.getTitle()).to.eq('dataCenterApp.placeOfAction.home.title');
    });

    it('should load create PlaceOfAction page', async () => {
        await placeOfActionComponentsPage.clickOnCreateButton();
        placeOfActionUpdatePage = new PlaceOfActionUpdatePage();
        expect(await placeOfActionUpdatePage.getPageTitle()).to.eq('dataCenterApp.placeOfAction.home.createOrEditLabel');
        await placeOfActionUpdatePage.cancel();
    });

    it('should create and save PlaceOfActions', async () => {
        const nbButtonsBeforeCreate = await placeOfActionComponentsPage.countDeleteButtons();

        await placeOfActionComponentsPage.clickOnCreateButton();
        await placeOfActionUpdatePage.setStreetInput('street');
        expect(await placeOfActionUpdatePage.getStreetInput()).to.eq('street');
        await placeOfActionUpdatePage.setHouseNumberInput('houseNumber');
        expect(await placeOfActionUpdatePage.getHouseNumberInput()).to.eq('houseNumber');
        await placeOfActionUpdatePage.setCityInput('city');
        expect(await placeOfActionUpdatePage.getCityInput()).to.eq('city');
        await placeOfActionUpdatePage.setAdditionInput('addition');
        expect(await placeOfActionUpdatePage.getAdditionInput()).to.eq('addition');
        await placeOfActionUpdatePage.geoPositionSelectLastOption();
        await placeOfActionUpdatePage.save();
        expect(await placeOfActionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await placeOfActionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last PlaceOfAction', async () => {
        const nbButtonsBeforeDelete = await placeOfActionComponentsPage.countDeleteButtons();
        await placeOfActionComponentsPage.clickOnLastDeleteButton();

        placeOfActionDeleteDialog = new PlaceOfActionDeleteDialog();
        expect(await placeOfActionDeleteDialog.getDialogTitle()).to.eq('dataCenterApp.placeOfAction.delete.question');
        await placeOfActionDeleteDialog.clickOnConfirmButton();

        expect(await placeOfActionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
