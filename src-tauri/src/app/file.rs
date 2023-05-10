use std::{fs::File, io::{BufReader, BufRead}};


#[tauri::command]
pub fn read_trajectory() -> Vec<String> {
    // format!("Hello, {}! You've been greeted from Rust!", name)

    let mut res = vec![];
    if let Ok(file) = File::open("\\\\wsl.localhost/Ubuntu/home/msc/xrslam/trajectory.tum") {
        let reader = BufReader::new(file);
        for line in reader.lines() {
            if let Ok(row) = line {
                res.push(row);
                // println!("{}", row);
            }
        }
    }
    res
}