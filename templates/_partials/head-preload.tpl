{$themeDir = _PS_THEME_DIR_}
{$preloadFilePath = "`$themeDir`assets/preload.html"}
{$urlsWithCdn = $urls.img_ps_url|replace:'/img/':'/'}

{if file_exists($preloadFilePath)}
  {capture name="preloadBlock"}{include file=$preloadFilePath}{/capture}

  {$smarty.capture.preloadBlock|replace:'/themes/':"`$urlsWithCdn`themes/" nofilter}
{/if}

