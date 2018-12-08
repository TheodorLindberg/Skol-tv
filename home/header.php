<?php 
if(!isset($TO_HOME_DIR)) $TO_HOME_DIR = "../"; 

echo "<style> \n";
require $TO_HOME_DIR."home-source/header/header.css";
echo "</style> \n";


?>


<header>
<ul class="header-nav">
    <li>
        <a href="#" id="name">Skol TV</a>
    </li>
    <li class="divider"></li>
    <li class="updateModel">
        <a href="<?php echo $TO_HOME_DIR?>home/layout/layout.php">Skapa/Ändra layout</a>
    </li>
    <li class="develope">
        <a href="<?php echo $TO_HOME_DIR?>home/cards/cards.php">Skapa/Ändra card</a>
    </li>
    <li class="profile">
        <?php echo '<a class="profile-name" href="#Profile" >' .$_SESSION['u_uid']. '</a>'; ?>
        <div class="profile-dropdown"> 
            <button class="profile-dropdown-element" id="logout">Logout</button>
        <a class="profile-dropdown-element" href="#">Link 2</a>
        <a class="profile-dropdown-element" href="#">Link 3</a>
        </div>
    </li>
</ul>
</header>

<script src="<?php echo $TO_HOME_DIR."source/external/jquery-3.3.1.min.js";?>">
    
</script>

<script src="<?php echo $TO_HOME_DIR."home-source/header/header.js";?>">
</script>
<script>
    userFile = '<?php echo $TO_HOME_DIR."source/database/connections/user.php"; ?>';
</script>
<script></script>