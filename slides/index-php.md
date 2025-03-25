## Index.php
```php [8|9-20]
<?php declare(strict_types=1);

use wnd\myTaskName\application\core\Runner;
use wnd\myTaskName\provider\ServiceLoader;

require __DIR__ . '/vendor/autoload.php';

return function ($event) {
   /*
    * runner:
	* -> creates DI container using ServiceLoader
	* -> instantiates task using DI
	* -> converts mixed event to DTO: EventPayload 
	* -> executes task
	*/ 
	(new Runner(
		new ServiceLoader(),
		getenv('APP_NAME')
	))->run($event);
	return "done";
};

```
Notes:
* Vše by mohlo být naimplementováno zde
* My chceme mít ale nějakou architekruru a balíčky na které jsme zvyklí