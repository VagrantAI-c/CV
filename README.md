# A CV of mine

Demo: https://vagrantai-c.github.io/CV/

Here lies an Angular CV template with fancy Google Docs stylization. It also features:
- Theme switch
- Print optimization
- Encrypted content

## Encryption

This project features sensitive content encryption with AES cyphering: 
- One can encrypt data via `npm run encrypt` command and then entering password. This can be useful to test visuals while content is cyphered.
- Decrypt content with `npm run decrypt` (password is required) so anyone can collaborate with the sensitive content
- Run `npm run commit`, enter password and commit name, and all files would be encrypted before commiting and decrypted after

**Primary con** of such system is that git diff will be littered with encoded labels.

### Usage

Any sensitive content should wrapped with delimiters and passed to `decode` pipe, e.g. 
```html
<p>{{'%%Sensitive content%%' | decode}}</p>
```