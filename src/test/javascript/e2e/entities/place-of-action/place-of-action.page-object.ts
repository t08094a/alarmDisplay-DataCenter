import { element, by, ElementFinder } from 'protractor';

export class PlaceOfActionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-place-of-action div table .btn-danger'));
    title = element.all(by.css('jhi-place-of-action div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PlaceOfActionUpdatePage {
    pageTitle = element(by.id('jhi-place-of-action-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    streetInput = element(by.id('field_street'));
    houseNumberInput = element(by.id('field_houseNumber'));
    cityInput = element(by.id('field_city'));
    additionInput = element(by.id('field_addition'));
    geoPositionSelect = element(by.id('field_geoPosition'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setStreetInput(street) {
        await this.streetInput.sendKeys(street);
    }

    async getStreetInput() {
        return this.streetInput.getAttribute('value');
    }

    async setHouseNumberInput(houseNumber) {
        await this.houseNumberInput.sendKeys(houseNumber);
    }

    async getHouseNumberInput() {
        return this.houseNumberInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setAdditionInput(addition) {
        await this.additionInput.sendKeys(addition);
    }

    async getAdditionInput() {
        return this.additionInput.getAttribute('value');
    }

    async geoPositionSelectLastOption() {
        await this.geoPositionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async geoPositionSelectOption(option) {
        await this.geoPositionSelect.sendKeys(option);
    }

    getGeoPositionSelect(): ElementFinder {
        return this.geoPositionSelect;
    }

    async getGeoPositionSelectedOption() {
        return this.geoPositionSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class PlaceOfActionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-placeOfAction-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-placeOfAction'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
