

const formatDateToMySQL=(dateStr)=>{
    console.log("inside date fuction",dateStr)
    
    if(isNaN(dateStr)){
        return null;
    }
    
    const dateObject=new Date(dateStr);
    const finalDate= dateObject.toISOString().slice(0, 19).replace('T', ' ');

    return finalDate;





}


module.exports={formatDateToMySQL}