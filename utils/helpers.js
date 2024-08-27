export default {
    formatDate: date => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        date = new Date(date); 
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedDate = `${month} ${day}, ${year}`;

        return formattedDate;
    },

    formatUser: user => {
        return `by ${user} |`;
    },

    binaryLikes: num => {
        console.log(num.toString(2))
        return num.toString(2);
    }
};