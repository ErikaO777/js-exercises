export function judge31DaysWithIF(month) {
    if (month === "Jan"){
        return true;
    }else if (month === "Feb"){
        return false;
    }else if (month === "Mar"){
        return true;
    }else if (month === "Apr"){
        return false;
    }else if (month === "May"){
        return true;
    }else if (month === "Jun"){
        return false;
    }else if (month === "Jul"){
        return true;
    }else if (month === "Aug"){
        return true;
    }else if (month === "Sep"){
        return false; 
    }else if (month === "Oct"){
        return true;
    }else if (month === "Nov"){
        return false;
    } else if (month === "Dec"){
        return true;
    }
}

export function judge31DaysWithSWITCH(month) {
    switch (month) {
        case "Jan":
        case "Mar":
        case "May":
        case "Jul":
        case "Aug":
        case "Oct":
        case "Dec":
            return true;
        case "Feb":
        case "Apr":
        case "Jun":
        case "Sep":
        case "Nov":
            return false;
        default:
            return ; 
    }
}