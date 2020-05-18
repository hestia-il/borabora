'use strict'
const axios = require("axios");

/**
 *
 * @returns {Promise<{response: {books: *}}|{response: {error: *}}>}
 */
const getAll = async () => {

    try{
        let result = await axios.get("https://comicclan.vett.io/comics", {
            headers: {"Authorization": "Bearer ComicClanVettIO2019"}
        });

        return {
            response: {
                books: result.data
            }
        }
    } catch (err) {
        return {
            response: {
                error: err
            }
        }
    }
    //
    // return new Promise(resolve => {
    //
    //     axios.get("https://comicclan.vett.io/comics", {
    //         headers: {"Authorization": "Bearer ComicClanVettIO2019"}
    //     }).then(result => {
    //         resolve({
    //             response: {
    //                 books: result.data
    //             }
    //         })
    //     }).catch(err => {
    //         console.error(err);
    //         resolve({
    //             response: {
    //                 error: err
    //             }
    //         })
    //     });
    //
    // })

};

const getById = async (id) => {

    try{
        let result = await axios.get("https://comicclan.vett.io/comics", {
            headers: {"Authorization": "Bearer ComicClanVettIO2019"},
            params: {
                q: id
            }
        });

        return {
            response: {
                books: result.data
            }
        }
    } catch (err) {
        return {
            response: {
                error: err
            }
        }
    }

};


module.exports = {
    getAll,
    getById,
};



// fetch("http://localhost:30000/api/books", {
//     "headers": {
//         "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//         "accept-language": "en-US,en;q=0.9,ru;q=0.8",
//         "cache-control": "max-age=0",
//         "if-none-match": "W/\"dd43-3vM+uj+lKlNNhfz9bLOKKE3IEb8\"",
//         "sec-fetch-dest": "document",
//         "sec-fetch-mode": "navigate",
//         "sec-fetch-site": "none",
//         "sec-fetch-user": "?1",
//         "upgrade-insecure-requests": "1",
//         "cookie": "Webstorm-278207a3=b861f1e4-454b-4251-9a3f-65aba304d4b1"
//     },
//     "referrerPolicy": "no-referrer-when-downgrade",
//     "body": null,
//     "method": "GET",
//     "mode": "cors"
// });