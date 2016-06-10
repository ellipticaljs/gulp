
import elliptical from '../references/elliptical';

var container=elliptical.container;

var Service = elliptical.Service;
var Location = elliptical.Location;
var Event = elliptical.Event;
var $Cookie = elliptical.$Cookie;
var $Session = elliptical.$Session;
var Sort = elliptical.Sort;
var $Sort = elliptical.$Sort;
var DomEvent = elliptical.DomEvent;
var $Rest = elliptical.$Rest;
var $Pagination = elliptical.$Pagination;

//set Rest endpoint props
$Rest.protocol = '';
$Rest.host = '';
$Rest.path = '/api';
$Rest.port = 80;

var $rest = new $Rest();


//registrations
container.mapType('Service', Service, $rest);
container.mapType('Sort', Sort, $Sort);
container.mapType('Notify', elliptical.Notify, elliptical.$Notify);
container.registerType('$Rest', $Rest);
container.registerType('Location', Location);
container.registerType('Event', Event);
container.registerType('$Local', elliptical.$Local);
container.registerType('$Cookie', $Cookie);
container.registerType('$Session', $Session);
container.registerType('DomEvent', DomEvent);
container.registerType('$ViewData', elliptical.$ViewData);


export default container;
