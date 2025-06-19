package com.gibongsa.widget

import android.app.AlarmManager
import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.SystemClock
import android.widget.RemoteViews
import com.gibongsa.R
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

class DonationWidgetProvider : AppWidgetProvider() {

    private val ACTION_AUTO_UPDATE = "com.gibongsa.widget.action.AUTO_UPDATE"
    private val ACTION_MANUAL_REFRESH = "com.gibongsa.widget.action.MANUAL_REFRESH"

    // --- 추가된 부분: 코루틴 스코프 ---
    private val coroutineScope = CoroutineScope(Dispatchers.IO)

    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        scheduleNextUpdate(context)
    }

    override fun onDisabled(context: Context) {
        super.onDisabled(context)
        cancelAlarm(context)
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)

        val appWidgetManager = AppWidgetManager.getInstance(context)
        val appWidgetIds = appWidgetManager.getAppWidgetIds(
            ComponentName(context, DonationWidgetProvider::class.java)
        )

        when (intent.action) {
            ACTION_AUTO_UPDATE -> {
                performUpdate(context, appWidgetManager, appWidgetIds)
            }
            ACTION_MANUAL_REFRESH -> {
                showLoadingState(context, appWidgetManager, appWidgetIds)

                coroutineScope.launch {
                    delay(1500) // 1.5초 대기
                    performUpdate(context, appWidgetManager, appWidgetIds)
                }
            }
        }
    }
    
    private fun showLoadingState(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        appWidgetIds.forEach { appWidgetId ->
            val loadingViews = RemoteViews(context.packageName, R.layout.widget_loading)
            appWidgetManager.updateAppWidget(appWidgetId, loadingViews)
        }
    }
    
    private fun performUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        val prefs = context.getSharedPreferences("DonationPrefs", Context.MODE_PRIVATE) // PREFS_NAME을 실제 값으로 변경
        val donationAmount = prefs.getString("KEY_DONATION_AMOUNT", "89,000원") ?: "89,000원" // KEY_DONATION_AMOUNT를 실제 값으로 변경
        val sdf = SimpleDateFormat("HH:mm", Locale.getDefault())
        val updateTime = "${sdf.format(Date())} 기준"
        prefs.edit().putString("KEY_UPDATE_TIME", updateTime).apply() // KEY_UPDATE_TIME을 실제 값으로 변경

        appWidgetIds.forEach { appWidgetId ->
            val remoteViews = RemoteViews(context.packageName, R.layout.widget_layout)
            val refreshPendingIntent = getPendingIntent(context, ACTION_MANUAL_REFRESH)
            remoteViews.setOnClickPendingIntent(R.id.widget_refresh_button, refreshPendingIntent)
            remoteViews.setTextViewText(R.id.widget_donation_amount, donationAmount)
            remoteViews.setTextViewText(R.id.widget_update_time, updateTime)
            appWidgetManager.updateAppWidget(appWidgetId, remoteViews)
        }
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        performUpdate(context, appWidgetManager, appWidgetIds)
    }

    private fun getPendingIntent(context: Context, action: String): PendingIntent {
        val intent = Intent(context, DonationWidgetProvider::class.java).apply {
            this.action = action
        }
        return PendingIntent.getBroadcast(context, action.hashCode(), intent, PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT)
    }

    private fun scheduleNextUpdate(context: Context) {
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val pendingIntent = getPendingIntent(context, ACTION_AUTO_UPDATE)
        val intervalMillis: Long = 60 * 60 * 1000 // 1시간
        val firstTriggerMillis = SystemClock.elapsedRealtime() + intervalMillis
        alarmManager.setRepeating(
            AlarmManager.ELAPSED_REALTIME,
            firstTriggerMillis,
            intervalMillis,
            pendingIntent
        )
    }

    private fun cancelAlarm(context: Context) {
        val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val pendingIntent = getPendingIntent(context, ACTION_AUTO_UPDATE)
        alarmManager.cancel(pendingIntent)
    }
}

