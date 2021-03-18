const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Promise = require('bluebird');
const db = require('../db/connection.js');

// test each individual line within the csv

var readCSV = function(filePath) {
    return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        var arrayOfLines = data.split('\n').slice(1);
        var arrayOfArrays = []
        arrayOfLines.forEach((line) => {
          var lineArray = line.split(',')
          arrayOfArrays.push(lineArray);
        })
        resolve(arrayOfArrays);
      }
    });
  })
}

var compareEntries = function(filePath, tableName) {
  readCSV(filePath)
    .then((value) => {
      return new Promise(function (resolve, reject) {
        db.query(`SELECT COUNT(*) FROM ${tableName}`, (error, data) => {
          if (error) {
            reject(error);
          } else {
            if (value.length === data[0]['COUNT(*)']) {
              resolve(true);
            } else {
              console.log(`length of ${tableName} csv`, value.length);
              console.log(`length of ${tableName} db`, data[0]['COUNT(*)'])
              resolve(false);
            }
          }
        })
      })
        .then((answer) => {
          console.log(`Same number of rows in ${tableName} table and csv`, answer);
        })
    })
};

const cleanData = function(filePath) {

}

const dataCheck = function(filePath, colNumber) {
  var readStream = fs.createReadStream(filePath, 'utf8');
  return new Promise(function(resolve, reject) {
    let data = [];
    readStream.on("data", (chunk) => {
      // var arrayOfLines = chunk.split('\n')
      data.push(chunk)
      // console.log(typeof chunk)
    });
    readStream.on("end", () => resolve(data));
    readStream.on("error", error => reject(error))
  })
    .then((data) => {
      console.log(data[0])
    })
    .catch((error) => {
      console.log(error)
    })
}

let productsFilePath = path.join('./data/product.csv')
let featuresFilePath = path.join('./data/features.csv')
let stylesFilePath = path.join('./data/styles.csv')
let photosFilePath = path.join('./data/photos.csv')

// readCSV(productsFilePath);
// compareEntries(productsFilePath, 'products')
// compareEntries(featuresFilePath, 'features')
// compareEntries(stylesFilePath, 'styles')

dataCheck(photosFilePath, 2)