# Seshn

![banner](../master/screenshots/banner.png)

A web app listing practice spots for breakdancers. features include relvant information per spots, in-app liability waiver signing, spot search, and more to come. Built using Google maps api, ReactJS, PostgresSQL, NodeJS, AWS Elastic beanstalk, S3 Bucket, API gateway.

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm start
```

### Compiles and minifies for production

```
npm build
```

<br/>

## Location Permission
<p align="left">
  <img src="../master/screenshots/permission.png" width="500px"/>
  <br clear="left"/>
  If permission is granted, map will move to your current city, otherwise it will default to Bronx, New York ( the birthplace of hiphop! )
</p>

<br/>

## Info Display
<p align="left">
  <img src="../master/screenshots/tooltip.png" width="300px"/>
  <br clear="left"/>
  Tooltip will prompt to select a spot first before info side bar can be deployed.
</p>

<br/>

<p align="left">
  <img src="../master/screenshots/sidebar.png" width="300px"/>
  <br clear="left"/>
  Clicking on a marker will populate side bar with data and deploy it.
  <br/>
  It is toggleable via the arrow button bottom right of the screen or by clicking the same marker again.
</p>

<br/>

## Adding A New Spot
<p align="left">
  <img src="../master/screenshots/modal.png" width="300px"/>
  <br clear="left"/>
  Clicking the plus button will bring up the modal to add a new spot.
  <br/>
  The entire map component will rerender to update with new spot marker.
</p>


#### only available for US cities for now, new features to come!
