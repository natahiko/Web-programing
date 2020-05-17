<?php

abstract class baseDAO{
	private $__connection;

	public function __construct(){
		$this->__connectToDB(DB_USER, DB_PASS, DB_HOST, DB_DATABASE);
	}

	private function __connectToDB($user, $pass, $host, $database){
		$this->__connection = mysqli_connect($host, $user, $pass, $database);
	}

	public function fetch(){
		$sql = "select * from {$this->_tableName};";
		$results = mysqli_query($this->__connection, $sql);
		$rows = array();

		while ($result = mysqli_fetch_array($results)) {
			$rows[] = $result;
		}
		return $rows;
	}
}

class bookDAO extends baseDAO{
	protected $_tableName = 'books';
	protected $_primaryKey = 'id';

	public function getUserById($id){
		$result = $this->fetch($id, 'id');
		return $result;
	}
}

//define global variables for sql connection
define('DB_USER', 'root');
define('DB_PASS', '2303');
define('DB_HOST', 'localhost');
define('DB_DATABASE', 'emaillab');

//set all variables in pathern
require 'smarty-3.1.34/libs/Smarty.class.php';
$smarty=new Smarty();
$smarty->template_dir = "smarty-3.1.34/templates";
$smarty->compile_dir = "smarty-3.1.34/templates_c";
$lang="ua";
$title="Книжкова сторінка";
$caption="BOOK CATALOGUE";
$smarty->assign("lang",$lang);
$smarty->assign("title", $title);
$smarty->assign("caption", $caption);

$book = new bookDAO();
$booksArray = $book->fetch();
$smarty->assign("caption", $caption);

$array = array();
foreach ($booksArray as $value) {
    $myarr = array('author'=>$value[1], 'name'=>$value[2], 'year'=>$value[4]);
    array_push($array, $myarr);
}
//set books array in pathern
$smarty->assign("books", $array);
$smarty->display("main.tpl");
?>