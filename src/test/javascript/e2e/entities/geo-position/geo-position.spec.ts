/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GeoPositionComponentsPage, GeoPositionDeleteDialog, GeoPositionUpdatePage } from './geo-position.page-object';

const expect = chai.expect;

describe('GeoPosition e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let geoPositionUpdatePage: GeoPositionUpdatePage;
    let geoPositionComponentsPage: GeoPositionComponentsPage;
    let geoPositionDeleteDialog: GeoPositionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load GeoPositions', async () => {
        await navBarPage.goToEntity('geo-position');
        geoPositionComponentsPage = new GeoPositionComponentsPage();
        expect(await geoPositionComponentsPage.getTitle()).to.eq('dataCenterApp.geoPosition.home.title');
    });

    it('should load create GeoPosition page', async () => {
        await geoPositionComponentsPage.clickOnCreateButton();
        geoPositionUpdatePage = new GeoPositionUpdatePage();
        expect(await geoPositionUpdatePage.getPageTitle()).to.eq('dataCenterApp.geoPosition.home.createOrEditLabel');
        await geoPositionUpdatePage.cancel();
    });

    it('should create and save GeoPositions', async () => {
        const nbButtonsBeforeCreate = await geoPositionComponentsPage.countDeleteButtons();

        await geoPositionComponentsPage.clickOnCreateButton();
        await geoPositionUpdatePage.setXInput('5');
        expect(await geoPositionUpdatePage.getXInput()).to.eq('5');
        await geoPositionUpdatePage.setYInput('5');
        expect(await geoPositionUpdatePage.getYInput()).to.eq('5');
        await geoPositionUpdatePage.save();
        expect(await geoPositionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await geoPositionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last GeoPosition', async () => {
        const nbButtonsBeforeDelete = await geoPositionComponentsPage.countDeleteButtons();
        await geoPositionComponentsPage.clickOnLastDeleteButton();

        geoPositionDeleteDialog = new GeoPositionDeleteDialog();
        expect(await geoPositionDeleteDialog.getDialogTitle()).to.eq('dataCenterApp.geoPosition.delete.question');
        await geoPositionDeleteDialog.clickOnConfirmButton();

        expect(await geoPositionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
