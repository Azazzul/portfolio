// URL of API to get the project and professionnal experiences

import { config } from "@fortawesome/fontawesome-svg-core";
import axios from 'axios'
// type Experiences = {
//     id: number,
//     title: string,
//     company: string,
//     images: string[],
//     date: Date,
//     description: string
// }
// type ExperiencesResult = {
//     data: Experiences[];
// };

export const API : string = "http://localhost/api/";
const API_KEY='c55ed287441f9329c4d1831910fdefc8'
const SECRET_KEY='e1dddca206ca52de3e9902de8d7aaa1f'
export const sendMail = async (email : string, message : string)=>{
    const data : any = JSON.stringify({
    "Messages": [{
      "From": {"Email": "fardouxbenoit@gmail.com", "Name": "<YOUR NAME>"},
      "To": [{"Email": "fardouxbenoit@gmail.com", "Name": name}],
      "Subject": "Contact site vitrine",
      "TextPart": "de" + email + message
    }]})

    const config = {
        method: 'post',
        url: 'https://api.mailjet.com/v3.1/send',
        data: data,
        headers: {'Content-Type': 'application/json'},
        auth: {username: API_KEY, password: SECRET_KEY},
      };

  return axios(config);
};

/*
get experience
 */
export const getProjets = async (id?: number): Promise<string> => {
    try {
        let request: string = API + "?action=projets";
        if (id) {
            request += "&id=" + id;
        }

        const response :Response = await fetch(request, {
            // Ajoutez les options de la requête si nécessaire, comme les en-têtes
            headers: {
              'Accept': 'application/json',
            }
        });

        const status :number= response.status;
        console.log(status);

        const result = await response.json();
        console.log(result);

        return result;
    } catch (error) {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
    }
};
export interface projet{
    id : number,
    title : string,
    nom : string,
    client : string,
    date : string,
    image : string,
    lien : string,
    description : string
}

export const waitDelay = (ms:number) =>  new Promise(res => setTimeout(res,ms));