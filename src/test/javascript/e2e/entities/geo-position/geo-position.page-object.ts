import { element, by, ElementFinder } from 'protractor';

export class GeoPositionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-geo-position div table .btn-danger'));
    title = element.all(by.css('jhi-geo-position div h2#page-heading span')).first();

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

export class GeoPositionUpdatePage {
    pageTitle = element(by.id('jhi-geo-position-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    xInput = element(by.id('field_x'));
    yInput = element(by.id('field_y'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setXInput(x) {
        await this.xInput.sendKeys(x);
    }

    async getXInput() {
        return this.xInput.getAttribute('value');
    }

    async setYInput(y) {
        await this.yInput.sendKeys(y);
    }

    async getYInput() {
        return this.yInput.getAttribute('value');
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

export class GeoPositionDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-geoPosition-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-geoPosition'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
