const proxy = require("proxy-agent");
const {KMSClient, DecryptCommand} = require("@aws-sdk/client-kms");
const {NodeHttpHandler} = require("@aws-sdk/node-http-handler");
const {Agent} = require("http");

process.env.AWS_PROFILE = 'profile'
const CIPHER = 'xxx'
const command = new DecryptCommand({CiphertextBlob: Buffer.from(CIPHER, 'base64')})
const client = new KMSClient({
    region: "eu-central-1",
    requestHandler: new NodeHttpHandler({
        httpAgent: new Agent({proxy: proxy("")}),
    }),
});

console.log('client created')

client.send(command).then(decrypted => {
    console.log('decrypted')
    let decoded = new TextDecoder().decode(decrypted.Plaintext)
    console.log(decoded)
}, err => {
    console.log(err);
});
