function e(e,t){return new Promise(((n,o)=>{const s=Math.random()>.3;setTimeout((()=>{s?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}const t=document.querySelector(".form");t.addEventListener("submit",(function(n){n.preventDefault();const o=parseInt(t.elements.delay.value),s=parseInt(t.elements.step.value),l=parseInt(t.elements.amount.value);for(let t=1;t<=l;t++){e(t,o+(t-1)*s).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)}))}}));
//# sourceMappingURL=03-promises.1d778af3.js.map
