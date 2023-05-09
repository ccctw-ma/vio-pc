use tauri::{AppHandle, CustomMenuItem, Manager, Menu, MenuItem, Submenu, WindowMenuEvent};

pub fn init() -> Menu {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let devtools = CustomMenuItem::new("devtools".to_string(), "Devtools");
    let help = Submenu::new("Help", Menu::new().add_item(devtools));
    let files = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    Menu::new().add_submenu(files).add_submenu(help)
}

pub fn menu_handler(event: WindowMenuEvent<tauri::Wry>) {
    let win = Some(event.window()).unwrap();
    let app = win.app_handle();
    let menu_id = event.menu_item_id();
    let menu_handle = win.menu_handle();

    match menu_id {
        "devtools" => {
            win.open_devtools();
            println!("Hello devtools");
            win.close_devtools();
        },
        _ => (),
    }
}
