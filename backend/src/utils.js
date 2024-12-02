// src/utils.js
// Option 1: Using just-debounce
import debounce from 'just-debounce';

export { debounce };

// // Option 2: Using native setTimeout
// export function debounce(func, delay) {
//     let timeoutId;
//     return function(...args) {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => func.apply(this, args), delay);
//     };

