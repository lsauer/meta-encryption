<?php
//author: lo sauer, 2013  lsauer.com
//description: reduce a word-list to ordinals, modulo a fixed number
//             and check the resulting distribution
//see:    https://github.com/lsauer/meta-encryption
$ciphercount = 6;
//infile
$handleIn  = @fopen("c:/!work/Databases/passwords.txt", "r");
//outfile
$handleOut = @fopen("c:/!work/Databases/passwords_ordinals_$ciphercount.txt", "w+");

if ($handleIn) {
    while (false !== ($line = fgets($handleIn, 4096))) {
    	$num = 0;
      for($i=0; $i<strlen($line); $i++) {
        $num += ord($line[$i]);
      }
      $num = $num % $ciphercount;
      fwrite($handleOut, $num.PHP_EOL);
    }
    if (!feof($handleIn) || !feof($handleOut) ) {
        echo "Error: unexpected file-handle fail\n";
    }
    fclose($handleIn);
    fclose($handleOut);
	echo "Task finished. Load the file into R.";
}
?>
