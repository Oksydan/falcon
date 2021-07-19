{$themeDir = _PS_THEME_DIR_}
{$preloadFilePath = "`$themeDir`assets/preload.html"}

{if file_exists($preloadFilePath)}
  {include file=$preloadFilePath}
{/if}
