'use strict'


const crypto = require('crypto');


const generateKeyPairSignature = (apiKey, apiSecret, expireTime) => {
  const content = [expireTime, apiKey];
  const signature = `${expireTime}:${crypto
    .createHmac('sha1', apiSecret)
    .update(content.join('\n'))
    .digest('hex')}`;
  return signature;
};


module.exports.templateTags = [
  {
    name: 'signature_fulll',
    displayName: 'Sinature-FULLL',
    description: 'Apply signature for datahub',
    args: [
      {
        displayName: 'api_secret',
        type: 'string',
        placeholder: 'API Secret',
      },
      {
        displayName: 'api_key',
        type: 'string',
        placeholder: 'API Key',
      },
      {
        displayName: 'ttl in seconds',
        type: 'number',
        placeholder: 'Optional TTL value in second',
      },
    ],
    async run(
      _,
      api_secret = '',
      api_key = '',
      ttl = undefined,
    ) {
      const signatureExpireTime = (Math.round(Date.now() / 1000) + (ttl || 2000)).toString();
      
      return `${generateKeyPairSignature(api_key, api_secret, signatureExpireTime)}`
    },
  },
]