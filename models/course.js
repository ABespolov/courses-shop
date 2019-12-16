const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuid();
    }

    toJSON() {
        return JSON.stringify({
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        })
    }

    static async update(course) {
        const courses = await Course.getAll();

        const index = courses.findIndex(el => el.id === course.id);
        courses[index] = course;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                'utf-8',
                (err, content) => {
                    if(err) throw reject(err);
                    else resolve();
                }
            )
        })
    }

    async save(){
        const courses = await Course.getAll();
        courses.push({
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        });

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                'utf-8',
                (err, content) => {
                    if(err) throw reject(err);
                    else resolve();
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if(err) throw reject(err);
                    else resolve(JSON.parse(content));
                }
            )
        })
    }

    static async getById(id) {
        const courses = await this.getAll();

        return courses.find(el => el.id === id);
    }
}

module.exports = Course;
