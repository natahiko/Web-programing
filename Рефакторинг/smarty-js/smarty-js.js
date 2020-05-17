var data = {
    caption: 'Hi, there are some JScript books you may find interesting:',
    books : [
        {
            title  : 'JavaScript: The Definitive Guide',
            author : 'David Flanagan',
            year  : '2018'
        },
        {
            title  : 'Murach JavaScript and DOM Scripting',
            author : 'Ray Harris',
            year: '1900'
        },
        {
            title  : 'Head First JavaScript',
            author : 'Michael Morrison',
            year  : '2019'
        }
    ]
};

var tplText = document.getElementById('allbooks').innerHTML;
var tpl = new jSmart( tplText );
var res = tpl.fetch( data );

document.write( res );