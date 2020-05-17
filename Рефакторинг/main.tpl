<!doctype html>
<html>
<head>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=windows-1251"/>
    <meta name="description" lang="{$lang}">
    <title> {$title} </title>
    <link href="main.css" rel="stylesheet">
</head>
<body>
<h1 class="caption">{$caption}</h1>
   <br/>
   {foreach from=$books item=$book}
      <div>
            {if $book.year > 2010}
               <b>{$book.author} - {$book.name|upper} -{$book.year}</b>
            {else}
               {$book.author} - {$book.name|upper} -{$book.year}
            {/if}
      </div>
   {foreachelse}
      No books
   {/foreach}
</body>
</html>
