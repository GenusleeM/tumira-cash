import moment  from "moment"

const  formartDate = (date) =>{
    let formarted_date = moment(new Date(date)).format('LLL')
    return  formarted_date
} 


export default formartDate