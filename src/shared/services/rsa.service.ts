import { Injectable } from '@nestjs/common';
import * as rsa from 'node-rsa';

@Injectable()
export class RsaService {
  key = new rsa({ b: 512 });
  constructor() {
    this.key.setOptions({ encryptionScheme: 'pkcs1' });
    this.key.importKey(process.env.PUBLISH_RSA_KEY, 'pkcs8-public');
    this.key.importKey(process.env.PRIVATE_RSA_KEY, 'pkcs1-private');
  }

  encodeRSA(data): any {
    return this.key.encrypt(data, 'base64');
  }

  decodeRSA(data): any {
    return this.key.decrypt(data, 'utf8');
  }

  getPublishKey() {
    const key = process.env.PUBLISH_RSA_KEY;
    const private_key = process.env.PRIVATE_RSA_KEY;
    console.log(key);
    console.log(private_key);
  }

  encodeID(N): string {
    let nr = Math.floor(Math.random() * 999) + '';
    let nc = N + '';
    N = nr + nc.substring(1);
    let ix = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    N <= 9007199254740992 || alert("OMG no more uid's");
    var M = Math,
      F = M.floor,
      L = M.log,
      P = M.pow,
      r = '',
      I = ix,
      l = I.length,
      i;
    for (i = F(L(N) / L(l)); i >= 0; i--) {
      r += I.substr(F(N / P(l, i)) % l, 1);
    }
    return this.rev(new Array(10 - r.length).join('a') + r);
  }

  decodeID(S): any {
    let ix = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var S = this.rev(S),
      r = 0,
      i,
      l = S.length,
      I = ix,
      j = I.length,
      P = Math.pow;
    for (i = 0; i <= l - 1; i++) {
      r += I.indexOf(S.substr(i, 1)) * P(j, l - 1 - i);
    }
    return r;
  }

  rev(a) {
    return a.split('').reverse().join('');
  }
}
