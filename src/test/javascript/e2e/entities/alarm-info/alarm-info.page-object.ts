import { element, by, ElementFinder } from 'protractor';

export class AlarmInfoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-alarm-info div table .btn-danger'));
    title = element.all(by.css('jhi-alarm-info div h2#page-heading span')).first();

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

export class AlarmInfoUpdatePage {
    pageTitle = element(by.id('jhi-alarm-info-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    timeInput = element(by.id('field_time'));
    locationInput = element(by.id('field_location'));
    geopositionInput = element(by.id('field_geoposition'));
    keywordsInput = element(by.id('field_keywords'));
    commentInput = element(by.id('field_comment'));
    priorityInput = element(by.id('field_priority'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTimeInput(time) {
        await this.timeInput.sendKeys(time);
    }

    async getTimeInput() {
        return this.timeInput.getAttribute('value');
    }

    async setLocationInput(location) {
        await this.locationInput.sendKeys(location);
    }

    async getLocationInput() {
        return this.locationInput.getAttribute('value');
    }

    async setGeopositionInput(geoposition) {
        await this.geopositionInput.sendKeys(geoposition);
    }

    async getGeopositionInput() {
        return this.geopositionInput.getAttribute('value');
    }

    async setKeywordsInput(keywords) {
        await this.keywordsInput.sendKeys(keywords);
    }

    async getKeywordsInput() {
        return this.keywordsInput.getAttribute('value');
    }

    async setCommentInput(comment) {
        await this.commentInput.sendKeys(comment);
    }

    async getCommentInput() {
        return this.commentInput.getAttribute('value');
    }

    async setPriorityInput(priority) {
        await this.priorityInput.sendKeys(priority);
    }

    async getPriorityInput() {
        return this.priorityInput.getAttribute('value');
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

export class AlarmInfoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-alarmInfo-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-alarmInfo'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
