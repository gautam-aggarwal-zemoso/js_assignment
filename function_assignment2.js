/* An arrow function takes two arguments firstName and lastName and returns a 2 letter string 
that represents the first letter of both the arguments. For the arguments Roger and Waters, 
the function returns ‘RW’. Write this function */

const initials = (firstName, lastName) => {
    if (firstName && lastName) {
        return firstName[0] + lastName[0];
    } else if (firstName) {
        return firstName[0];
    } else if (lastName) {
        return lastName[0];
    } else {
        return '';
    }
}
