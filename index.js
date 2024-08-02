import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
        'message':'Type your URL:',
        'name':'URL',
    }
  ])
  .then((answers) => {
    var url = answers.URL;
    var qr_svg = qr.image(url);
    var imageName = url.replaceAll('.','_');
    qr_svg.pipe(fs.createWriteStream(imageName+'.png'));

    fs.writeFile(imageName+".txt",url,(error) => {
        if (error) throw error;
        console.log('The file has been saved!');
    })
  })
  .catch((error) => {
    console.log(error);
  });
