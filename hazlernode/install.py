from hazlernode.utils import (
    cleanup_hazler_scheduled_events,
    sync_hazler_scheduled_events,
)


def before_migrate():
    cleanup_hazler_scheduled_events()


def after_migrate():
    sync_hazler_scheduled_events()
