<?php
require_once './auth.php';
echo function_exists('validateToken') ? 'Função existe' : 'Função não existe';