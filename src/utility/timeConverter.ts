export const ConvertTime=(timestamp:any)=>{

    // Given timestamp
    // const timestamp = { seconds: 1706657974, nanoseconds: 363000000 };
    
    // Convert nanoseconds to milliseconds
    const milliseconds = timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);
    
    // Create a Date object
    const date = new Date(milliseconds);
    
    // Format the date as a string
    const formattedTime = date// or use other methods to format as needed
    
    return date
}
