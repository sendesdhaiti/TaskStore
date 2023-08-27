import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.production';
import { ValidateEmail } from '../Comp/contact/contact.component';

interface INextFormProcess {
    nextFormInputProcess: (names: string[], processAction: string) => void,
}
@Injectable()
export class NextFormProcess implements INextFormProcess {
    public setTime = 1000


     nextFormInputProcess(names: string[], processAction: string) {
        const p = processAction.toLowerCase()
        if (names.length > 0) {
            if (p == "hide") {
                names.forEach(name => {
                    const e = document.getElementById(name)
                    if (e) {
                        // e.contentEditable = "false"
                        setTimeout(() => {
                            e.style.display = 'none'
                        }, this.setTime)
                    }
                })
                return 0
            } else {
                names.forEach(name => {
                    const e = document.getElementById(name)
                    if (e) {
                        // e.contentEditable = "false"
                        setTimeout(() => {
                            e.style.display = 'flex'
                        }, this.setTime)
                    }
                })
                return 1
            }
        }
        return -1
    }
}

export function wait_Forsec_then_return_undefined(sec: number) {
    setTimeout(() => {

    }, sec)
    return undefined
}

@Injectable()
export class MSEncrypt {
    constructor(private log: logGapFormat) {

    }

    checkEmailThenEncrypt(email: string) {
        let e
        if (ValidateEmail(email)) {
            e = this.encrypt(email)
        } else if (email.length > 50) {
            e = email
        } else {
            e = ""
        }
        return e;
    }

    encrypt(text?: string) {
        const log = new logGapFormat()
        var key = CryptoJS.enc.Utf8.parse(environment.CryptKey);
        var iv = CryptoJS.enc.Utf8.parse(environment.CryptKey);

        var encryptedText = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text?.trim() ?? ''), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        this.log.Log(text, encryptedText.toString())
        return encryptedText.toString()
    }
}

@Injectable()
export class logGapFormat {
    Gap1 = "===============\n"
    Space = "\t "
    Gap2 = "\n==============="
    Log(o: any, encrypted: any) {
        console.log(this.Gap1 + this.Space + o + this.Space + encrypted + this.Gap2)
    }
}