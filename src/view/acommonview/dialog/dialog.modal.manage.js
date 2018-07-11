import React from 'react';

import {Modal, Button} from 'antd';

const confirm = Modal.confirm;

export default class DialogModalMmanage {

    static showConfirm(title: String, content: String, okText: String, cancelText: String, onConfirmOk: Function, onConfirmCancel: Function) {
        confirm({
            title: title,
            content: content,
            okText: okText ? okText : 'Yes',
            cancelText: cancelText ? cancelText : 'No',
            onOk() {
                console.log('OK');
                if (onConfirmOk) {
                    onConfirmOk();
                }
            },
            onCancel() {
                console.log('Cancel');
                if (onConfirmCancel) {
                    onConfirmCancel();
                }
            },
        });
    }

    static showDeleteConfirm(title: String, content: String, okText: String, cancelText: String, onConfirmOk: Function, onConfirmCancel: Function) {
        confirm({
            title: title ? title : 'Are you sure delete this task?',
            content: content ? content : 'Some descriptions',
            okText: okText ? okText : 'Yes',
            okType: 'danger',
            cancelText: cancelText ? cancelText : 'No',
            onOk() {
                console.log('OK');
                if (onConfirmOk) {
                    onConfirmOk();
                }
            },
            onCancel() {
                console.log('Cancel');
                if (onConfirmCancel) {
                    onConfirmCancel();
                }
            },
        });
    }

    static showInfo(title: String, content: String, ) {
        Modal.info({
            title: title,
            width: 540,
            okText: '确定',
            content: (
                <div>
                    <p>{content}</p>
                </div>
            ),
            onOk() {
            },
        });
    }

    static info() {
        Modal.info({
            title: 'This is a notification message',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
            onOk() {
            },
        });
    }

    static success() {
        Modal.success({
            title: 'This is a success message',
            content: 'some messages...some messages...',
        });
    }

    static error() {
        Modal.error({
            title: 'This is an error message',
            content: 'some messages...some messages...',
        });
    }

    static warning() {
        Modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...',
        });
    }

    static successWithTimeOut() {
        const modal = Modal.success({
            title: 'This is a notification message',
            content: 'This modal will be destroyed after 1 second',
        });
        setTimeout(() => modal.destroy(), 1000);
    }


}