#!/bin/bash
# Script to increase inotify watch limits for Next.js/Turbopack development
# Run with: sudo bash increase_inotify_limit.sh

echo "Current inotify limits:"
sysctl fs.inotify.max_user_watches
sysctl fs.inotify.max_user_instances

echo ""
echo "Increasing limits..."

# Increase max_user_watches to 524288 (enough for large projects)
sudo sysctl -w fs.inotify.max_user_watches=524288
sudo sysctl -w fs.inotify.max_user_instances=512

# Make changes permanent by adding to /etc/sysctl.conf
if ! grep -q "fs.inotify.max_user_watches" /etc/sysctl.conf; then
    echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
else
    sudo sed -i 's/^fs\.inotify\.max_user_watches.*/fs.inotify.max_user_watches=524288/' /etc/sysctl.conf
fi

if ! grep -q "fs.inotify.max_user_instances" /etc/sysctl.conf; then
    echo "fs.inotify.max_user_instances=512" | sudo tee -a /etc/sysctl.conf
else
    sudo sed -i 's/^fs\.inotify\.max_user_instances.*/fs.inotify.max_user_instances=512/' /etc/sysctl.conf
fi

echo ""
echo "New limits:"
sysctl fs.inotify.max_user_watches
sysctl fs.inotify.max_user_instances

echo ""
echo "Limit increased successfully!"
echo "You may need to restart your development server."