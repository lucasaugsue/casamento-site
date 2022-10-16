import Axios from 'axios'
import moment from 'moment'
import qs from 'qs'

export const CRYPT_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6ImIxMTFmMDc1LWI5ZWQtNGZiMC1iMTkyLTZhOTQ3ZDVjMjZmOCIsImlhdCI6MTU1NjM3Njk5NSwiZXhwIjoxNTU2MzgwNTk1fQ.Tw_OGQBINy8YslKwvsoeufkD97NqYeu-PiaqhTeLUj4'

export const firstsLettersUpper = (str) => {
    if(!str) return str

    return str.toString().split(" ").reduce((pv, s) => { 
        let formated = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
        return pv + (pv === "" ? formated : ` ${formated}`)
    }, "")
}

export const removeSpecialChars = (str) => {
    return str ? str.toString().replace(/\-|\ |\.|\,|\_|\(|\)|\//g, "") : null
}

export function groupBy(list, func, keyValidator){
    let map = [];
    list.forEach((item) => {
        let key = func(item);
        
        let i = -1;
        map.forEach((mapItem, index) => {
            if(i === -1 && (
                (mapItem[0] === key) ||
                (keyValidator && mapItem[0][keyValidator] === key[keyValidator])
            )) i = index;
        })
        
        if(i === -1) map.push([key, [item]])
        else map[i][1].push(item);
    })

    return map;
}

export function permit(object, keys){
    let res = {...object}

    for(let k in res) if(keys.indexOf(k) === -1) delete res[k];

    return res;
}

export function formatCpf(cpf){
    if(!cpf) return null;
    else{
        let c = cpf.replace(/\.|\-|\//g, '')
        return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9, 11)}`
    }
}

export function formatCnpj(cnpj){
    if(!cnpj) return null;
    else{
        let c = cnpj.replace(/\.|\-|\//g, '')
        return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12, 14)}`
    }
}

export function formatReais(value){
    return `R$ ${parseFloat(value ? value : 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}`
}

export function formatPhone(phone){
    return phone ? `+55${phone.replace(/\-|\ |\.|\,|\_|\(|\)|\//g, "")}` : null
}

export function cieloAmountToFloat(amount){
    return parseFloat(
        amount.toString().slice(0, (amount.toString().length - 2)) + 
        "." + 
        amount.toString().slice((amount.toString().length - 2))
    )
}

export function formatString(str){
    if(str === null || str === undefined) return str;
    else return str.toString().toUpperCase()
}

export function validCpf(strCPF){
    strCPF = strCPF.replace(/ |\.|\-|\//g, "")
    let sum;
    let rest;
    sum = 0;
    if (!strCPF || strCPF === "00000000000") return false;
        
    for (let i=1; i<=9; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(strCPF.substring(9, 10)) ) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    
    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export function getExtenseMonth(month){
    return [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ][parseInt(month)]
}

export function getWeekDay(date){
    return [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ][moment(date).weekday()]
}

export function getExtenseWeekday(number){
    return [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ][number]
}

export const getAddressByCep = (cep) => {
    const url = `http://viacep.com.br/ws/${cep}/json`
    return Axios.get(url)
        .then(res => res.data)
        .catch(error => ({ error: error }))
}

export const getAddressByPlaceId = (ctx, placeId) => {
    return new Promise((resolve, reject) => {
        const url = 'https://maps.googleapis.com/maps/api/place/details/json?' + qs.stringify({
            key: process.env.GOOGLE_API_KEY,
            placeid: placeId,
            language: 'en-US',
        })

        Axios.get(url)
        .then(({data : {result}}) => {
            if(!result) throw new Error("Address not found");

            const cepComponent = (result.address_components || []).find(ac => ac.types.find(t => ["postal_code"].includes(t)))
            const countryComponent = (result.address_components || []).find(ac => ac.types.find(t => ["country"].includes(t)))
            const stateComponent = (result.address_components || []).find(ac => ac.types.find(t => ["administrative_area_level_1"].includes(t)))
            const cityComponent = (result.address_components || []).find(ac => ac.types.find(t => ["administrative_area_level_2", "locality"].includes(t)))
            const neighborhoodComponent = (result.address_components || []).find(ac => ac.types.find(t => ["sublocality_level_1", "route"].includes(t)))
            const numberComponent = (result.address_components || []).filter(ac => ac.types.find(t => ["street_number"].includes(t)))
            const addressComponents = (result.address_components || []).filter(ac => ac.types.find(t => ["sublocality"].includes(t)))

            if(!cepComponent || !countryComponent || !stateComponent || !cityComponent) throw new Error(ctx.strings.INVALID_LOCATION);

            resolve({
                place_id: placeId,
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng,
                zip_code: cepComponent ? cepComponent.long_name : "",
                country: countryComponent ? countryComponent.long_name : "",
                state: stateComponent ? ((countryComponent && countryComponent.long_name === "Brazil") ? stateComponent.short_name : stateComponent.long_name) : "",
                city: cityComponent ? cityComponent.long_name : "",
                neighborhood: neighborhoodComponent ? neighborhoodComponent.long_name : "",
                number: numberComponent ? numberComponent.long_name : "",
                address: [
                    result.name,
                    addressComponents.length > 0 ? addressComponents.map(ac => ac.long_name).join(" - ") : result.formatted_address
                ].map(notNull => notNull).join(" - "),
            })
        })
        .catch(reject)
    })
}


export function getExtenseDate(mdate){
    mdate = moment(mdate)
    return (
        mdate.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
        ? "Hoje"
        : mdate.format("YYYY-MM-DD") === moment().add(1, "days").format("YYYY-MM-DD")
            ? "Amanhã"
            : [
                `Segunda-feira`, `Terça-feira`, `Quarta-feira`, `Quinta-feira`, `Sexta-feira`, `Sábado`, `Domingo`
            ][parseInt(mdate.format("E")) - 1] + 
            ` - ${moment(mdate).format("DD")} de ${getExtenseMonth(parseInt(moment(mdate).format("MM")) - 1)} de ${moment(mdate).format("YYYY")}`
    ).toUpperCase()
}


export function getMonday(d) {
    const monday = moment(d, "YYYY-MM-DD").subtract(1, "days").startOf("week").add(1, "days")
    return monday.format("YYYY-MM-DD")
}

export function getSunday(d) {
    const monday = moment(d, "YYYY-MM-DD").subtract(1, "days").endOf("week").add(1, "days")
    return monday.format("YYYY-MM-DD")
}

export const successfullCodes = {
    'staging' : [ '0', '00', '4', '6' ],
    'homologacao' : [ '0', '00', '6' ],
    'production' : [ '0', '00', '6' ]
}

export const successfullCaptureCodes = {
    'staging' : [ '6' ],
    'homologacao' : [ '6' ],
    'production' : [ '6' ]
}

export const validEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}