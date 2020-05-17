<?php
/* Smarty version 3.1.34-dev-7, created on 2020-03-25 18:29:27
  from 'C:\xampp\htdocs\Рефакторинг\main.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_5e7b94f7a609b5_94100590',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '55997b1a1ba61af8d745c9127800f700f59dad48' => 
    array (
      0 => 'C:\\xampp\\htdocs\\Рефакторинг\\main.tpl',
      1 => 1585157366,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_5e7b94f7a609b5_94100590 (Smarty_Internal_Template $_smarty_tpl) {
?><!doctype html>
<html>
<head>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=windows-1251"/>
    <meta name="description" lang="<?php echo $_smarty_tpl->tpl_vars['lang']->value;?>
">
    <title> <?php echo $_smarty_tpl->tpl_vars['title']->value;?>
 </title>
    <link href="main.css" rel="stylesheet">
</head>
<body>
<h1 class="caption"><?php echo $_smarty_tpl->tpl_vars['caption']->value;?>
</h1>
   <br/>
   <?php
$_from = $_smarty_tpl->smarty->ext->_foreach->init($_smarty_tpl, $_smarty_tpl->tpl_vars['books']->value, 'book');
if ($_from !== null) {
foreach ($_from as $_smarty_tpl->tpl_vars['book']->value) {
?>
      <div>
         <?php ob_start();
echo $_smarty_tpl->tpl_vars['book']->value['author'];
$_prefixVariable1 = ob_get_clean();
echo $_prefixVariable1;?>
 - <?php echo mb_strtoupper($_smarty_tpl->tpl_vars['book']->value['name'], 'UTF-8');?>
 -
            <?php if ($_smarty_tpl->tpl_vars['book']->value['year'] > 2010) {?>
               <b><?php echo $_smarty_tpl->tpl_vars['book']->value['year'];?>
</b>
               <?php } else { ?>
               <span><?php echo $_smarty_tpl->tpl_vars['book']->value['year'];?>
</span>
            <?php }?>
      </div>
   <?php
}
} else {
?>
      No books
   <?php
}
$_smarty_tpl->smarty->ext->_foreach->restore($_smarty_tpl, 1);?>

</body>
</html>
<?php }
}
