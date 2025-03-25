## Task.php
```php [11|18-25]
<?php
declare(strict_types=1);

namespace wnd\myTaskName\application;

use Psr\Log\LogLevel;
use wnd\log\Logger;
use wnd\myTaskName\domain\event\EventPayload;
use wnd\myTaskName\domain\NotificationInterface;

class Task implements TaskInterface
{
    public function __construct(
            private Logger $logger,
            private NotificationInterface $notificationRespository,
    ) {}
    
    public function run(EventPayload $payload): void
    {
        $this->logger->log(
            'LAMBDA: myTaskName: ' . $payload->identifier,
            LogLevel::DEBUG
        );
        $this->notificationRespository->notify($payload->identifier, $payload->offset);
    }
}
```