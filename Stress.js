// SOFTWARE LICENSE AGREEMENT FOR DIODE.JS, DIODE.WASM, AND ALL CODE ON DIODEMESSENGER.COM
// IMPORTANT: Each user should review this license before using the software components. 

// 1. DEFINITIONS
// The "Software" refers specifically to certain components and all associated code from a specific domain.
// This ensures clarity on what is being licensed.
// "Software" refers to the Diode.js, Diode.wasm components, and all code retrieved from the domain diodemessenger.com, intended for use solely as part of the chat messenger application developed by Diode Messenger.

// 2. LICENSE
// This section details the legal binding of the agreement and the requirement of agreement for software use.
// By accessing, installing, or using the Software, you acknowledge that this End User License Agreement (EULA) is a legally binding and valid contract and agree to be bound by its terms. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or distribute the Software.

// 3. LICENSE GRANT
// This section specifies the conditions under which the software can be used. Restrictive licensing is often used to prevent unauthorized use or resale.
// Diode Messenger grants you a non-exclusive, non-transferable license to install and use the Software solely as part of the chat messenger application developed by Diode Messenger. Any other use, modification, copying, reproduction, distribution, or resale of the Software, separate from the chat messenger application, is strictly prohibited.

// 4. OWNERSHIP
// This section ensures that the licensor retains all ownership rights, even when granting a license to use the software.
// The Software is owned and copyrighted by Diode Messenger. Your license confers no title or ownership in the Software and is not a sale of any rights in the Software.

// 5. COPYRIGHT
// Explicitly points out that the software is protected by copyright and other intellectual property rights.
// The Software contains copyrighted material, trade secrets, and other proprietary material. You shall not violate any applicable copyright, trademark, or other intellectual property laws or regulations.

// 6. NO WARRANTIES
// A common clause that explicitly states there are no guarantees with the software, limiting potential liability.
// Diode Messenger expressly disclaims any warranty for the Software. The Software is provided 'As Is' without any express or implied warranty of any kind.

// 7. LIMITATION OF LIABILITY
// This clause is used to limit the amount and types of damages the licensor can be held responsible for.
// In no event shall Diode Messenger or its suppliers be liable for any damages whatsoever (including, without limitation, damages for loss of business profits, business interruption, loss of business information, or any other pecuniary loss) arising out of the use or inability to use the Software, even if Diode Messenger has been advised of the possibility of such damages.

// 8. SUBJECT TO CHANGE
// This clause indicates the software's evolving nature, potentially open-sourcing some components in the future.
// This license and the availability of parts of the Software are subject to change. Upon the full release of the chat messenger application, certain parts of the Software may be open-sourced to promote security and provability.

// 9. TERMINATION
// This clause details how the license can be terminated if terms are breached, ensuring control over misuse.
// This Agreement will terminate automatically if you fail to comply with the limitations described in this Agreement. On termination, you must destroy all copies of the Software.

// 10. GOVERNING LAW
// Indicates which country's laws will govern the agreement. It's vital for dispute resolution.
// This Agreement shall be governed by the laws of the United Kingdom.

// 11. ENTIRE AGREEMENT
// Specifies that this agreement is the complete understanding between the parties, which can prevent claims of additional implied terms.
// This is the entire agreement between you and Diode Messenger which supersedes any prior agreement or understanding, whether written or oral, relating to the subject matter of this license.

// By using the software, the user agrees to all these terms.
// By installing or using the Software, you agree to be bound by the terms of this Agreement.

// The official entity behind the software and the date this license is in effect.
// Diode Messenger

// 2023-08-16

// -- END OF SOFTWARE LICENSE AGREEMENT -- //

/*
  
  We plan to open-source parts of this code to promote security and provability.
  This license is subject to change. Upon the full release of the chat messenger application, certain parts of the Software may be open-sourced to promote security and provability.
  
  If you would like to contact us, please email us
  via jake@couldbejake.io - new email TBD.

*/

// Stress.js programmatically iterates through all
// cryptographic functions written in Crypto.js and
// attempts to test their robustness over long periods
// of time.

window.DiodeCrypto.registerInit(async () =>{
  var stress = new Stress();

  //await stress.stress_mceliece_keygen()
  await stress.stress_rsa_keygen()
  //await stress.stress_ed25519_keygen()
  //await stress.stress_mceliece460896f_encap()
  await stress.stress_rsa_encap()
  //await stress.stress_ed25519_sign()
  //await stress.stress_mceliece460896f_decap()
  //await stress.stress_RSA_decap()
  //await stress.stress_ed25519_verify()
})

function Stress(){
  
  var stress = this;

  stress.log = (message) => {
    console.log(`(${Date.now()}) ${message} ${Math.random()}`)
  }

  stress.error = (message) => {
    console.log(`%c(${Date.now()}) ${message} ${Math.random()}`, 'color: red;');
  }

  stress.info = (message) => {
    console.log(`%c(${Date.now()}) ${message} ${Math.random()}`, 'color: cyan;');
  }

  let iters_per_algo = 15;
  
  // keygen 

  stress.stress_mceliece_keygen = async function(){
    stress.log("Stress-testing mceliece keygen")
    var failed = 0;
    for (let i = 0; i < iters_per_algo; i++) {
      try {
        await DiodeCrypto.gen_mceliece460896f()
        stress.log("[V] mceliece keygen success")
      } catch (error) {
        console.error(error)
        failed += 1;
        stress.error("[X] mceliece keygen failed")
      }
    }
    stress.info(`mceliece keygen success:${iters_per_algo - failed} failed: ${failed}`)
  }

  stress.stress_rsa_keygen = async function(){
    stress.log("Stress-testing rsa keygen")
    var failed = 0;
    for (let i = 0; i < iters_per_algo; i++) {
      try {
        await DiodeCrypto.gen_RSA()
        stress.log("[V] rsa success")
      } catch (error) {
        console.error(error)
        failed += 1;
        stress.error("[X] rsa failed")
      }
    }
    stress.info(`rsa keygen success:${iters_per_algo - failed} failed: ${failed}`)
  }

  stress.stress_ed25519_keygen = async function(){
    stress.log("Stress-testing ed25519 keygen")
    var failed = 0;
    for (let i = 0; i < iters_per_algo; i++) {
      try {
        await DiodeCrypto.gen_ed25519()
        stress.log("[V] ed25519 success")
      } catch (error) {
        console.error(error)
        failed += 1;
        stress.error("[X] ed25519 failed")
      }
    }
    stress.info(`ed25519 keygen success:${iters_per_algo - failed} failed: ${failed}`)
  }

  // encap / sign

  stress.stress_mceliece460896f_encap = async function(){
    stress.log("Stress-testing mceliece encap")
    var failed = 0;
    var keys;
    try {
      keys = await DiodeCrypto.gen_mceliece460896f()
    } catch (error) {
      stress.error("WARNING: KEYGEN FAILED, CANNOT ENCAPSULATE")
    }
    
    for (let i = 0; i < iters_per_algo; i++) {
      try {
        await DiodeCrypto.encap_mceliece460896f(keys.pub)
        stress.log("[V] mceliece keygen success")
      } catch (error) {
        console.error(error)
        failed += 1;
        stress.error("[X] mceliece keygen failed")
      }
    }
    stress.info(`mceliece encap success:${iters_per_algo - failed} failed: ${failed}`)
  }

  stress.stress_rsa_encap = async function(){
    stress.log("Stress-testing rsa encap")
    var failed = 0;
    var keys;
    try {
      keys = await DiodeCrypto.gen_RSA()
    } catch (error) {
      stress.error("WARNING: KEYGEN FAILED, CANNOT ENCAPSULATE")
    }
    
    for (let i = 0; i < iters_per_algo; i++) {
      try {
        let out = await DiodeCrypto.encap_RSA(keys.pub);
        stress.log("[V] rsa encap success")
      } catch (error) {
        console.error(error)
        failed += 1;
        stress.error("[X] rsa encap failed")
      }
    }
    stress.info(`rsa encap success:${iters_per_algo - failed} failed: ${failed}`)
  }

  stress.stress_ed25519_sign = async function(){
    stress.log("Stress-testing ed25519 sign")
    var failed = 0;
    var keys;
    try {
      keys = await DiodeCrypto.gen_ed25519()
    } catch (error) {
      stress.error("WARNING: KEYGEN FAILED, CANNOT SIGN")
    }
    
    for (let i = 0; i < iters_per_algo; i++) {
      try {
        let out = await DiodeCrypto.sign_ed25519("Example message", keys.priv);
        stress.log("[V] ed25519 sign success")
      } catch (error) {
        console.error(error)
        failed += 1;
        stress.error("[X] ed25519 sign failed")
      }
    }
    stress.info(`ED25519 encap success:${iters_per_algo - failed} failed: ${failed}`)
  }

  // decap / verify

  stress.stress_mceliece460896f_decap = async function(){
    stress.log("Stress-testing mceliece decap")
    var failed = 0;
    var keys;
    var out1;
    var out2;

    try {
      keys = await DiodeCrypto.gen_mceliece460896f()
    } catch (error) {
      stress.error("WARNING: KEYGEN FAILED, CANNOT DECAPSULATE")
    }

    try {
      out1 = await DiodeCrypto.encap_mceliece460896f(keys.pub)
    } catch (error) {
      stress.error("WARNING: KEYGEN FAILED, CANNOT DECAPSULATE")
    }

    for (let i = 0; i < iters_per_algo; i++) {
      try {
        out2 = await DiodeCrypto.decap_mceliece460896f(keys.priv, out1.cipher)
        stress.log("[V] mceliece decap success")

        if(out1.secret != out2.shared_secret){
          failed += 1
          stress.error("[X] mceliece decap failed; aes key mismatch")
        }

      } catch (error) {
        console.error(error)
        failed += 1;
        stress.error("[X] mceliece decap failed; return error")
      }
    }
    stress.info(`mceliece decap success:${iters_per_algo - failed} failed: ${failed}`)
  }

  stress.stress_RSA_decap = async function(){
    stress.log("Stress-testing rsa decap")
    var failed = 0;
    var keys;
    var out1;
    var out2;

    try {
      keys = await DiodeCrypto.gen_RSA()
    } catch (error) {
      stress.error("WARNING: KEYGEN FAILED, CANNOT DECAPSULATE")
    }

    try {
      out1 = await DiodeCrypto.encap_RSA(keys.pub)
    } catch (error) {
      stress.error("WARNING: KEYGEN FAILED, CANNOT DECAPSULATE")
    }

    for (let i = 0; i < iters_per_algo; i++) {
      try {
        out2 = await DiodeCrypto.decap_RSA(keys.priv, out1.cipher)
        stress.log("[V] rsa decap success")

        if(out1.secret != out2.shared_secret){
          failed += 1
          stress.error("[X] rsa decap failed; aes key mismatch")
        }

      } catch (error) {
        console.error(error)
        failed += 1;
        stress.error("[X] rsa decap failed; return error")
      }
    }
    stress.info(`rsa decap success:${iters_per_algo - failed} failed: ${failed}`)
  }

  stress.stress_ed25519_verify = async function(){
    stress.log("Stress-testing ed25519 verify")
    var failed = 0;
    var keys;
    var out1;
    var out2;

    try {
      keys = await DiodeCrypto.gen_ed25519()
    } catch (error) {
      stress.error("WARNING: KEYGEN FAILED, CANNOT VERIFY")
    }

    try {
      out1 = await DiodeCrypto.sign_ed25519("Hello World!", keys.priv)
    } catch (error) {
      stress.error("WARNING: KEYGEN FAILED, CANNOT VERIFY")
    }

    for (let i = 0; i < iters_per_algo; i++) {
      try {
        out2 = await DiodeCrypto.verify_ed25519(out1.sig, keys.pub, "Hello World!")
        stress.log("[V] ed25519 verify success")

        if(!out2.verified){
          failed += 1
          stress.error("[X] ed25519 verify failed; signature did not match")
        }

      } catch (error) {
        console.error(error)
        failed += 1;
        stress.error("[X] ed25519 verify failed; return error")
      }
    }
    stress.info(`ed25519 verify success:${iters_per_algo - failed} failed: ${failed}`)
  }

}
