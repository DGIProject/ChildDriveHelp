/**
 * Created by Dylan on 25/01/2015.
 */

function DRIVE() {
    this.date = '--';

    this.address1 = '--';
    this.address2 = '--';

    this.address = [];

    this.distance = 0;
    this.time = 0;
}

DRIVE.prototype.updateDistance = function(distance) {
    this.distance = distance;
};

DRIVE.prototype.plusTime = function() {
    this.time++;
};

DRIVE.prototype.lessTime = function() {
    if(this.time > 0)
    {
        this.time--;
    }
};