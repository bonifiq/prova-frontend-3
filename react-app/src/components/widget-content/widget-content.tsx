import { type ReactElement } from 'react';
import { useWidgetHook } from './widget-content.hook';
import { WidgetContentLayout } from './widget-content.layout';

export const WidgetContent = (): ReactElement => {
    const controller = useWidgetHook();

    return <WidgetContentLayout {...controller}/>
}