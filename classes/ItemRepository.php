<?php

require_once("../DbObj.php");
require_once("Item.php");

class ItemRepository
{
	private static $db = null;
	private static $items = array();

	private static function _getDb()
	{
		if (is_null(self::$db))
		{
			self::$db = new DbObj;
		}
		return self::$db;
	}

	protected static function init()
	{
		$dbRows = self::_getDb()->getRows();
		$dbData = array();
		foreach ($dbRows as $row)
		{
			array_push($dbData,
					new Item(
						$row['ID'],
						$row['Phone_name'],
						$row['OS'],
						$row['Status'],
						$row['Date'],
						$row['Comments']
				)
			);
		}
		self::$items = $dbData;
	}

	public static function getItems()
	{
		self::init();
		return self::$items;
	}

	public static function takeItem($id, $status)
	{
		$db = self::_getDb();
		$result = $db->takeItem($id, $status);
		return $result;
	}

	public static function freeItem($id)
	{
		$db = self::_getDb();
		$result = $db->freeItem($id, 'Free');
		return $result;
	}
}